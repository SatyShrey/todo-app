import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useApp } from './Contexts'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { AnimatePresence, MotiView } from 'moti';
const Todos = () => {
    const { todos, deleteTodo, completeTodo, darkTheme } = useApp();
    const [selected, setselected] = useState('')
    return (<ScrollView showsVerticalScrollIndicator={false}
        className='flex-1'>
        <AnimatePresence>
            {todos.map((item) =>
                <MotiView key={item.id}
                    from={{ translateY: -40, opacity: 0, translateX: 0 }}
                    animate={{ translateY: 0, opacity: 1, translateX: 0 }}
                >
                    <View className='flex-row justify-between border-b-[0.2px] border-blue-500 mt-4'>
                        <Pressable className='p-2 ps-0.5 active:scale-95' onPress={() => completeTodo(item.id, todos)}>
                            <View className='w-8 h-8 rounded items-center justify-center' style={{ boxShadow: "0 0 2px #3b82f6" }} >
                                {
                                    item.completed && <FontAwesome name='check' size={19} color={darkTheme ? "#d1d5db" : "#111827"} />
                                }
                            </View>
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
                                    <Pressable onPress={() => deleteTodo(item.id, todos)} className='ms-0.5 h-8 my-2 active:scale-95'>
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