export default function AssignmentDetails() {
    return (
        <div className="space-y-8 overflow-hidden">
            <h1 className="text-xl lg:text-4xl font-bold text-center text-orange-600">
                Internship Assignment ✨
            </h1>
           
            <div className="bg-gray-50 dark:bg-neutral-800 sm:border sm:border-gray-200 sm:dark:border-neutral-700 sm:rounded-xl p-6 space-y-10 sm:shadow-md">
                <div className="space-y-4">
                    <h2 className="text-lg lg:text-2xl font-semibold">📌 Objective</h2>
                    <div>
                        <p>Build a simple admin dashboard in <strong>Next.js</strong> (with <strong>TypeScript</strong>) to:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>List users</li>
                            <li>Add new users via a multi-step form</li>
                            <li>Apply filters</li>
                            <li>Use API, state, conditional rendering, and form validation</li>
                        </ul>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold mb-2">📂 Key Features</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-medium">1. Dashboard (<code>/dashboard</code>)</h3>
                            <ul className="list-disc list-inside mt-1 space-y-1">
                                <li>Fetch from <code className="whitespace-break-spaces line-clamp-1">https://jsonplaceholder.typicode.com/users</code></li>
                                <li>Show name, email, phone, and city</li>
                                <li>Add search (filter by name/city)</li>
                                <li>Show loading & error states</li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-medium">2. Add User (<code>/dashboard/add</code>)</h3>
                            <ul className="list-disc list-inside mt-1 space-y-1">
                                <li>3-step form: Basic Info → Address → Review</li>
                                <li>Use <code>useState</code> or Context</li>
                                <li>Validate required fields & email</li>
                                <li>Log data on submit</li>
                                <li>Back to dashboard button</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold mb-2">⚡ Optional Extras</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Animate form with <code>framer-motion</code></li>
                        <li>Save progress to <code>localStorage</code></li>
                        <li>Light/dark mode (Tailwind)</li>
                        <li>Toast/modal on success</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">🧰 Stack</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Next.js + TypeScript</li>
                        <li>Tailwind CSS or CSS Modules</li>
                        <li>Axios or fetch</li>
                        <li>Optional: framer-motion, react-hook-form, zod</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">📬 Submit</h2>
                    <p>
                        Send your code + screen recording or hosted link to <br />
                        <a href="mailto:vikas@codingjr.online" className="text-blue-600 underline">
                            vikas@codingjr.online
                        </a>{" "}
                        <br />
                        along with your name, phone number, and GitHub profile.
                    </p>
                </div>

                <p className="text-center text-gray-500 dark:text-gray-400 pt-4">
                    — Sumit
                </p>
            </div>
        </div>
    );
}
