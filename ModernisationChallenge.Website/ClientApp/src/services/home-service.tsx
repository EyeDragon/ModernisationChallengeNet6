import { ITask } from "src/models/task-model";
import { BaseService } from "./base/base-service";

export class HomeService extends BaseService {

    public async asyncLoadTasks() {
        var result = await this.GET<ITask[]>({
            url: "LoadTasks"
        });
        console.log(result)
        return result;
    }

    public async asyncSaveTask(data: { details: string }) {
        var result = await this.POST<boolean>({
            url: "SaveTask",
            body: data
        });
        return result;
    }

    public async asyncEditTask(data: { id: number, details: string }) {
        var result = await this.PUT<boolean>({
            url: "EditTask",
            body: data
        });
        return result;
    }

    public async asyncDeleteTask(id: number) {
        var result = await this.DELETE<boolean>({
            url: "DeleteTask",
            params: { id }
        });
        return result;
    }

    public async asyncCompleteTask(data: { id: number, completed: boolean }) {
        var result = await this.PUT<boolean>({
            url: "CompleteTask",
            body: data
        });
        return result;
    }
}

export const homeService = new HomeService("Home")