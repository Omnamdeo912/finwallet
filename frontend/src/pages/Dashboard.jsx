import { InputBox } from "../components/InputBox";

export function Dashboard(){
    return <div className="px-10">
        <div className="flex justify-between pt-10 pb-3" >
            <div className="font-bold text-4xl tex-black">Fin Wallet</div>
            <div className="flex justify-between">
                <div className="text-md">Hello,User</div>
                {/* <img src="../assets/r" alt="" /> */}
            </div>
        </div>
        <hr />
        <div className="flex pt-5">
            <div className="font-bold text-2xl">Your Balance   </div>
            {/* <div className="font-bold text-l">{balance}</div> */}
        </div>
        <div className="pb-5 pt-5">
            <label for="user" class="block mb-2 text-2xl font-medium text-black dark:text-white text-left ">Users</label>
            <input type="text" id="user" class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search users..." required></input>
        </div>
    </div>
}