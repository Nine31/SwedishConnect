import { makeAutoObservable, runInAction } from "mobx";
import { Vijest } from "../models/vijest";
import agent from "../api/agent";

export default class VijestStore {
    vijestRegistry = new Map<string, Vijest>();
    selectedVijest: Vijest | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

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

        return Array.from(grouped.entries());
    }

    get vijestiByDate() {
        return Array.from(this.vijestRegistry.values()).sort((a, b) => 
            new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
        );
    }

    loadVijesti = async () => {
        try {
            const vijesti = await agent.Vijesti.list();
            vijesti.forEach(vijest => {
                vijest.publishedDate = vijest.publishedDate.split('T')[0];
                this.vijestRegistry.set(vijest.slug!, vijest);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
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
                if (this.selectedVijest?.slug === slug) this.cancelSelectedVijest();
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

    selectVijest = (slug: string) => {
        this.selectedVijest = this.vijestRegistry.get(slug);
    }

    cancelSelectedVijest = () => {
        this.selectedVijest = undefined;
    }

    openForm = (slug?: string) => {
        slug ? this.selectVijest(slug) : this.cancelSelectedVijest();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }
}
    