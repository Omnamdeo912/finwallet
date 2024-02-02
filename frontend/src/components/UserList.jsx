import { Button } from "./Button";

export function UserList({ username }) {
    
    return <div className="flex justify-between">
        <div className="text-black font-bold text-xl">{ username }</div>
        <Button label={"Send Money"} />
    </div>
}