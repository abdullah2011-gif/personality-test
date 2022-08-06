import Home from "./containers/Home/Home";
import Questions from "./containers/Questions/Questions";
import Result from "./containers/Result/Result";
const routes = [
    {
        path: "/home",
        component: Home
    },
    {
        path: "/questions",
        component: Questions
    },
    {
        path: "/result",
        component: Result
    },
]
export default routes