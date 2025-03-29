import { makeAutoObservable, runInAction } from "mobx";
import { Vijest } from "../models/vijest";
import agent from "../api/agent";

export default class VijestStore {
    vijestRegistry = new Map<string, Vijest>();
    selectedVijest: Vijest | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get vijestiByCategory() {
        const grouped = new Map<string, Vijest[]>();

        this.vijestiByDate.forEach(vijest => {
            if (!grouped.has(vijest.category)) {
                grouped.set(vijest.category, []);
            }
            grouped.get(vijest.category)?.push(vijest);
        });

        // Lokalizovano sortiranje po abecedi (Bosanski, Hrvatski, Srpski)
        return Array.from(grouped.entries()).sort((a, b) =>
            a[0].localeCompare(b[0], 'bs', { sensitivity: 'base' })
        );

        // Sortiranje kategorija abecedno
        // return Array.from(grouped.entries()).sort((a, b) => a[0].localeCompare(b[0]));

        // kategorije sortirane nasumicno
        // return Array.from(grouped.entries());
    }

    get vijestiByDate() {
        return Array.from(this.vijestRegistry.values()).sort((a, b) => 
            b.publishedDate!.getTime() - a.publishedDate!.getTime()
            // new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
        );
    }

    loadVijesti = async () => {
        this.setLoadingInitial(true);
        try {
            const vijesti = await agent.Vijesti.list();
            vijesti.forEach(vijest => {
                this.setVijest(vijest);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadVijest = async (slug: string) => {
        let vijest = this.getVijest(slug);
        if (vijest) {
            this.selectedVijest = vijest;
            return vijest;
        }
        else {
            this.setLoadingInitial(true);
            try {
                vijest = await agent.Vijesti.details(slug);
                this.setVijest(vijest);
                runInAction(() => this.selectedVijest = vijest);
                this.setLoadingInitial(false);
                return vijest;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    
    createVijest = async (vijest: Vijest) => {
        this.loading = true;
        try {
            await agent.Vijesti.create(vijest);
            runInAction(() => {
                this.vijestRegistry.set(vijest.slug!, vijest);
                this.selectedVijest = vijest;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateVijest = async (vijest: Vijest) => {
        this.loading = true;
        try {
            await agent.Vijesti.update(vijest);
            runInAction(() => {
                this.vijestRegistry.set(vijest.slug!, vijest);
                this.selectedVijest = vijest;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteVijest = async (slug: string) => {
        this.loading = true;
        try {
            await agent.Vijesti.delete(slug);
            runInAction(() => {
                this.vijestRegistry.delete(slug);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    private setVijest = (vijest: Vijest) => {
        vijest.publishedDate = new Date(vijest.publishedDate!);
        // vijest.publishedDate = vijest.publishedDate.split('T') [0];
        this.vijestRegistry.set(vijest.slug!, vijest);
    }

    private getVijest = (slug: string) => {
        return this.vijestRegistry.get(slug);
    }
}
    