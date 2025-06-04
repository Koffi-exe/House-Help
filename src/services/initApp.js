import { useAppstore } from "../store/useAppstore";
import axios from "axios";

const initApp = async () => {
    try {
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))
        if (loggedUser && loggedUser.userId ) {
            const employeeResponse = await axios.get('https://house-help-server.onrender.com/api/list/employees')
            useAppstore.getState().setEmployeeData(employeeResponse.data.employees, loggedUser.userId)
            // console.log('log from init employeeResponse', employeeResponse.data.employees)

            const employerResponse = await axios.get('https://house-help-server.onrender.com/api/list/employers')
            useAppstore.getState().setEmployerData(employerResponse.data.Employers, loggedUser.userId)
            // console.log("log from initApp:", employerResponse.data)
        }
    } catch (error) {
        console.log(`Error loading the application: error:${error}`)
    }
}
export default initApp