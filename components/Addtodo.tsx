import { Pressable, TextInput, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import { useApp } from './Contexts';
import { AnimatePresence, MotiView } from 'moti'
const Addtodo = () => {
    const [text, settext] = useState('');
    const { todos, addTodo, darkTheme } = useApp();

    return (
        <View style={{ boxShadow: "0 0 3px #3b82f6" }} className={`flex-row overflow-hidden p-2 shadow-blue-500 rounded-2xl items-center ${darkTheme ? "bg-gray-800" : "bg-gray-200"}`}>
            <TextInput numberOfLines={2} multiline placeholder='Write a note...'
                value={text}
                className={`placeholder:text-gray-500 font-[Regular] flex-1 ${darkTheme ? "text-gray-300" : "text-gray-900"}`}
                onChangeText={settext} />
            <AnimatePresence>
                {
                    text && <MotiView from={{ translateX: 30,opacity:0 }}
                        animate={{ translateX: 0,opacity:1 }}
                        exit={{translateX:30,opacity:0}}>
                        <Pressable className={`bg-blue-500 rounded-xl py-3 px-4`} onPress={() => {
                            addTodo(text, todos); settext('')
                        }} >
                            <FontAwesome name='plus' size={20} color={darkTheme ? "#111827" : "#d1d5db"} />
                        </Pressable>
                    </MotiView>
                }
            </AnimatePresence>
        </View>
    )
}
export default Addtodo
