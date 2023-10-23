import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { TodoService } from "../services/todo.service";
import { of, switchMap } from "rxjs";

export const canActivateDetailsRoute: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const todoService = inject(TodoService);
    const router = inject(Router);
    const todoId: number = Number(route.params['id']);

    return todoService.loadTodosAsync()
    .pipe(
        switchMap((todos) => {
            const todoIdx: number = todos.findIndex(i => i.id === todoId);
            return todoIdx === -1 ? router.navigate(['..']) : of(true)
        })
    )
}