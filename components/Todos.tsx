import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useApp } from './Contexts'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { AnimatePresence, MotiView } from 'moti';
import LottieView from 'lottie-react-native';
import empty from "../assets/lottie/empty.json"
const Todos = () => {
    const { todos, deleteTodo, completeTodo, darkTheme } = useApp();
    const [selected, setselected] = useState('')

    if(todos.length<1){
        return <View className='flex-1 justify-center items-center'>
            <Text className={`${darkTheme?"text-gray-300":"text-gray-900"} font-[SemiBold] text-xl`}>Empty</Text>
            <LottieView source={empty} autoPlay style={{width:400,height:400}} />
        </View>
    }

    return (<ScrollView showsVerticalScrollIndicator={false}
        className='flex-1'>
        <AnimatePresence>
            {todos.map((item) =>
                <MotiView key={item.id}
                    from={{ translateY: -40, opacity: 0, translateX: 0 }}
                    animate={{ translateY: 0, opacity: 1, translateX: 0 }}
                >
                    <View className='flex-row justify-between items-center border-b-[0.2px] border-blue-500 mt-4'>
                        <Pressable className='w-10'
                            onPress={() => completeTodo(item.id, todos)}>
                            <FontAwesome
                                name={item.completed ? "check-square-o" : "square-o"}
                                size={30} color="#3b82f6" />
                        </Pressable>

                        <Pressable className='flex-1' onPress={() => setselected((prev) => prev === item.id ? "" : item.id)}>
                            <Text
                                className={`${item.completed ? "text-red-500 decoration-dotted" : `${darkTheme ? "text-gray-300" : "text-gray-900"}`} font-[Regular]`}
                                style={{ textDecorationLine: item.completed ? "line-through" : "none" }}
                                numberOfLines={selected === item.id ? undefined : 1}
                            >{item.text}</Text>
                            <Text className='text-xs font-[Regular] text-gray-500'>{item.id.substring(4, 21)}</Text>
                        </Pressable>
                        <AnimatePresence>
                            {
                                item.completed && <MotiView from={{ translateX: 50 }} animate={{ translateX: 0 }} exit={{ translateX: 50 }}>
                                    <Pressable onPress={() => deleteTodo(item.id, todos)}>
                                        <Ionicons name='trash' size={24} color={"#ef4444"} />
                                    </Pressable>
                                </MotiView>
                            }
                        </AnimatePresence>
                    </View>
                </MotiView>
            )}
        </AnimatePresence>
    </ScrollView>)
}
export default Todos
const styles = StyleSheet.create({})