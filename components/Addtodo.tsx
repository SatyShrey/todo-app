import { Pressable, TextInput, View } from 'react-native';
import { useRef, useState } from 'react';
import { useApp } from './Contexts';
import LottieView from 'lottie-react-native'
import typingAnimation from "../assets/lottie/typing.json"

import { AnimatePresence, MotiView } from 'moti'
import { FontAwesome } from '@expo/vector-icons';
import { MotiPressable } from 'moti/interactions';
const Addtodo = () => {
    const [text, settext] = useState('');
    const { todos, addTodo, darkTheme } = useApp();
    const [typing, setTyping] = useState(false);
    const timeout = useRef<NodeJS.Timeout | null>(null);

    function animate() {
        setTyping(true);
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
        timeout.current = setTimeout(() => {
            setTyping(false);
            timeout.current = null;
        }, 400);
    }


    return (
        <View style={{ boxShadow: "0 0 3px #3b82f6", position: "relative", zIndex: 1 }}
            className={`flex-row p-2 overflow-hidden shadow-blue-500 rounded-2xl items-center ${darkTheme ? "bg-gray-800" : "bg-gray-200"}`}>
            <TextInput placeholder='Write a note...'
                value={text}
                className={`placeholder:text-gray-500 font-[Regular] flex-1 ${darkTheme ? "text-gray-300" : "text-gray-900"}`}
                onChangeText={settext} onKeyPress={animate} />
            <AnimatePresence>
                {text && <MotiPressable 
                from={{ translateX: 50, opacity: 0 }} 
                animate={{ translateX: 0, opacity: 1 }} 
                exit={{ translateX: 50, opacity: 0 }} 
                style={{ width: 40, height: 40, justifyContent: "center", alignItems: "center" }} 
                onPress={()=>{addTodo(text,todos);settext('')}}
                >
                    {
                        typing ? <LottieView autoPlay source={typingAnimation} style={{ width: 80, height: 80,marginTop:10 }} />
                            : <FontAwesome name='download' size={30} color={"#3b82f6"} />
                    }
                </MotiPressable>
                }
            </AnimatePresence>
        </View>
    )
}
export default Addtodo
