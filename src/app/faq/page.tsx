export default function FAQPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-12">Frequently Asked Questions</h1>
      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">How long does shipping take?</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Standard shipping typically takes 3-5 business days. Express shipping is available at checkout for 1-2 day delivery.</p>
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">What is your return policy?</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">We offer a 30-day return policy for unused items in their original packaging. Please contact support to initiate a return.</p>
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Do you ship internationally?</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Currently, we only ship within India. We are working on expanding our delivery network globally.</p>
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">How can I track my order?</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Once your order ships, you will receive an email with tracking information. You can also track your order directly from your account page.</p>
        </div>
      </div>
    </div>
  );
}
