/* eslint-disable */
export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">Contact Us</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
        We'd love to hear from you. Please fill out the form below or reach out to us at support@lykeindia.com.
      </p>
      <form className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input type="text" id="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:bg-zinc-900 dark:border-gray-700 sm:text-sm h-10 px-3 border" placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input type="email" id="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:bg-zinc-900 dark:border-gray-700 sm:text-sm h-10 px-3 border" placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
          <textarea id="message" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black dark:bg-zinc-900 dark:border-gray-700 sm:text-sm p-3 border" placeholder="How can we help?"></textarea>
        </div>
        <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-gray-200">
          Send Message
        </button>
      </form>
    </div>
  );
}
