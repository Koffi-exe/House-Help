import {create} from 'zustand'

export const useAppstore = create((set)=>({
    employeeData: [],
    setEmployeeData: (data, excludedId)=>set({
        employeeData: data.filter((emp)=> emp.userId != excludedId)
    }),
    employerData:[],
    setEmployerData: (data, excludedId)=>set({
        employerData:data.filter((emp)=> emp.userId != excludedId) 
    }),
    numberOfEmployees:null,
    setNumberOfEmployees: (data)=>set({numberOfEmployees: data}),
    numberOfEmployers: null,
    setNumberOfEmployers: (data)=>set({numberOfEmployers:data})


}))

