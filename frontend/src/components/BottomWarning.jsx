export function BottomWarning({label,buttonText,to}){
    return <div className="pb-5 pt-1">
        <label for="terms" class="ms-2 text-md font-medium text-gray-900 dark:text-gray-300">{label}<a href={to} class="text-blue-600 hover:underline dark:text-blue-500"><u>{buttonText}</u></a></label>
    </div>
}