import { Request, Response } from "express";

const todos = [
    {id: 1, text: 'By milk', completedAt: new Date()},
    {id: 2, text: 'Buy bread', completedAt: null},
    {id: 3, text: 'By butter', completedAt: new Date()},
]

export class TodosController {

    constructor(){}

    public getTodos = (req: Request, res: Response) => {
        res.json(todos);
    };

    public getTodoById = (req: Request, res: Response) => {
        // + para convertir el valor a numero
        const id = +req.params.id;
        // status 400: información requerida erronea
        if (isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'});
        const todo = todos.find(todo => todo.id === id);
        // Error cuando no encuentro elemento: status 404
        ( todo) ? res.json(todo) : res.status(404).json({error: `TODO with id ${id} not found`});
        
    };

    public createTodo = ( req: Request, res: Response) => {
        const {text} = req.body;
        if (!text) return res.status(404).json({error: 'Text property is required'});
        const newTodo = {
            id: todos.length + 1,
            text,
            completedAt: null
        }
        todos.push(newTodo);
        res.json(newTodo);
    };

    public updateTodo = (req: Request, res: Response) => {
        // + para convertir el valor a numero
        const id = +req.params.id;
        // status 400: información requerida erronea
        if (isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'});

        const todo = todos.find(todo => todo.id === id);
        if (!todo) return res.status(404).json({error: `Todo with ID ${id} not found`});

        const { text, completedAt } = req.body;

        todo.text = text || todo.text;
        (completedAt === 'null') ? todo.completedAt = null : todo.completedAt = new Date(completedAt || todo.completedAt );

        //! OJO, referencia

        res.json(todo);
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        // status 400: información requerida erronea
        if (isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'});
        
        const todo = todos.find(todo => todo.id === id);
        if (!todo) return res.status(404).json({error: `Todo with ID ${id} not found`});

        todos.splice( todos.indexOf(todo), 1);
        res.json(todo);
    }
}