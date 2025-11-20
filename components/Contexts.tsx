import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Poppins_100Thin as Thin } from '@expo-google-fonts/poppins/100Thin';
import { Poppins_400Regular as Regular } from '@expo-google-fonts/poppins/400Regular';
import { Poppins_500Medium as Medium } from '@expo-google-fonts/poppins/500Medium';
import { Poppins_600SemiBold as SemiBold } from '@expo-google-fonts/poppins/600SemiBold';
import { Poppins_700Bold as Bold } from '@expo-google-fonts/poppins/700Bold';
import { useFonts } from 'expo-font'
import LoadingScreen from "./LoadingScreen";
import { StatusBar } from "expo-status-bar";

export type childrenProps = {
    children: ReactNode
}
export type Todo = {
    id: string;
    text: string;
    completed: boolean;
}
export type ToDoValues = {
    todos: Todo[];
    addTodo: (text: string, todos: Todo[]) => void;
    completeTodo: (id: string, todos: Todo[]) => void;
    deleteTodo: (id: string, todos: Todo[]) => void;
    darkTheme: boolean;
    changeTheme: () => void;
}

const Contexts = createContext<ToDoValues | null>(null);

export const Provider = ({ children }: childrenProps) => {
    const [todos, settodos] = useState<Todo[]>([]);
    const [darkTheme, setdarkTheme] = useState(false)
    const colorScheme = useColorScheme();

    const updateTodo = async (newTodos: Todo[]) => {
        await AsyncStorage.setItem('todos', JSON.stringify(newTodos))
        settodos(newTodos);
    }

    const addTodo = (text: string, todos: Todo[]) => {
        const newTodos: Todo[] = [
            {
                id: new Date().toString() + Math.random(),
                text, completed: false
            },
            ...todos
        ];
        updateTodo(newTodos)
    }

    const completeTodo = async (id: string, todos: Todo[]) => {
        const newTodos: Todo[] = todos.map(item => {
            const iscompleted = item.completed
            if (item.id === id) { return { ...item, completed: !iscompleted } }
            else { return item }
        })
        updateTodo(newTodos)
    }

    const deleteTodo = async (id: string, todos: Todo[]) => {
        const newTodos: Todo[] = todos.filter(item => item.id !== id)
        updateTodo(newTodos)
    }

    const changeTheme = () => {
        setdarkTheme(prev => !prev)
    }

    useEffect(() => {
        if (colorScheme === 'dark') {
            setdarkTheme(true)
        }
        else { setdarkTheme(false) }
    }, [colorScheme])

    const [loaded, setloaded] = useState(false);
    async function fetchData() {
        const data = await AsyncStorage.getItem("todos");
        if (data) {
            settodos(JSON.parse(data))
        }
     setloaded(true)
    }
    useEffect(() => {
        fetchData();
    }, [])

    const [fontsLoaded] = useFonts({
        Thin,
        Regular,
        Medium,
        SemiBold,
        Bold,
    });

    return (<Contexts.Provider value={{ todos, addTodo, completeTodo, deleteTodo, darkTheme, changeTheme }}>
        <SafeAreaProvider>
            <StatusBar style={darkTheme?"light":"dark"}/>
            <SafeAreaView className={`${darkTheme ? "bg-gray-900" : "bg-gray-300"} flex-1 px-2`}>
                {(loaded && fontsLoaded) ? <>{children}</> : <LoadingScreen />}
            </SafeAreaView>
        </SafeAreaProvider>
    </Contexts.Provider>)
}

export const useApp = () => {
    const values = useContext(Contexts);
    if (!values) {
        throw new Error("useApp used outside of Provider")
    }
    return values
}