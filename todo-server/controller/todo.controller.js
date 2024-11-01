import Todo from '../model/todo.model.js'

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find()
        res.status(200).json(todos)
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
}

export const addTodo = async (req, res) => {
    try {
        const { title } = req.body
        if (!title) {
            return res.status(400).send({ message: "Title  is required" });
        }
        const newTodo = new Todo({ title })
        await newTodo.save()

        res.status(201).json(newTodo)
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).send({ message: "Id is required" });
        }
        await Todo.findByIdAndDelete(req.params.id)

        res.status(200).json({ message: "Todo deleted succefully" })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
}

export const toggleTodo = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).send({ message: "Id is required" });
        }
        const todo = await Todo.findById(id)
        todo.completed = !todo.completed;
        await todo.save();

        res.status(200).json({ message: "Succesully changed togglesd todo status" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
}

export const editTodo = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).send({ message: "Id is required" });
        }
        const todo = await Todo.findById(id)
        todo.title = req.body.title;
        await todo.save();

        res.status(200).json({ message: "Succesully updated todo" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
}