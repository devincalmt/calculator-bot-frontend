import { CALCULATOR_API as calculatorApi } from "./services";

export const login = async (email: string) => {
    return calculatorApi.post({
        endpoint: 'login',
        data: {
            email
        }
    }).then(({ data }) => data.data)
}