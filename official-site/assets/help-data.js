(function () {
  window.HELP_CONTENT = {
    categories: [
      { slug: 'getting-started', title: 'Getting started', description: 'Build the foundation of a store that is ready to sell.', count: 8, tone: 'acid' },
      { slug: 'products', title: 'Products and inventory', description: 'Organize products, variants, bundles, and the stock behind them.', count: 12, tone: 'blue' },
      { slug: 'orders', title: 'Orders and fulfillment', description: 'Move paid orders from checkout to a confident delivery.', count: 10, tone: 'coral' },
      { slug: 'payments', title: 'Checkout and payments', description: 'Set up payment methods and keep checkout moving.', count: 7, tone: 'ink' },
      { slug: 'growth', title: 'Growth and channels', description: 'Bring together discounts, tracking, reports, and retention.', count: 11, tone: 'acid' },
      { slug: 'release-notes', title: 'Release notes', description: 'See what changed and where it shows up in your work.', count: 6, tone: 'blue' }
    ],
    articles: [
      {
        slug: 'launch-your-store', category: 'getting-started', title: 'Launch your store with the essentials in place', readTime: '6 min read', updatedAt: 'Updated Jul 14, 2026',
        excerpt: 'The shortest reliable path from an empty store to a storefront ready for its first customer.',
        content: '<p>Launching is not a checklist of every option in the platform. It is the moment a customer can find a product, pay with confidence, and receive a clear order confirmation.</p><h2>The minimum launch path</h2><ol><li>Add the products you can fulfill today.</li><li>Connect at least one payment method.</li><li>Review shipping locations and rates.</li><li>Preview the storefront on mobile before publishing.</li></ol><p>Once these four steps are in place, use Home to see the next order, stock, or setup signal that deserves attention.</p>'
      },
      {
        slug: 'fulfill-paid-orders', category: 'orders', title: 'Fulfill paid orders without losing the customer context', readTime: '5 min read', updatedAt: 'Updated Jul 12, 2026',
        excerpt: 'Use the order detail as the source of truth for what was purchased, paid, and ready to ship.',
        content: '<p>Orders move from payment to fulfillment as separate pieces of work. A paid order is ready for a fulfillment decision, but it may still contain multiple items or delivery needs.</p><h2>Before marking an order fulfilled</h2><ul><li>Confirm the payment status is paid.</li><li>Review each order item and its quantity.</li><li>Add tracking only when the carrier has accepted the shipment.</li></ul><p>Use the Customer link from the order when you need more context before taking action.</p>'
      },
      {
        slug: 'set-up-payments', category: 'payments', title: 'Set up payments for a checkout customers can trust', readTime: '7 min read', updatedAt: 'Updated Jul 10, 2026',
        excerpt: 'Choose a primary card processor first, then add independent payment methods where they make sense.',
        content: '<p>Payments are intentionally separated into a primary card processor and independent payment methods. This makes the customer choice clear and keeps reconciliation understandable.</p><h2>Recommended setup order</h2><ol><li>Connect your primary card processor.</li><li>Verify the public checkout experience.</li><li>Add PayPal or other independent methods only when the account is ready.</li></ol><p>Do not treat an enabled method as proof that a customer can complete checkout. Always run a real test path before launch.</p>'
      },
      {
        slug: 'understand-home-attention', category: 'getting-started', title: 'Understand the attention signals on Home', readTime: '3 min read', updatedAt: 'Updated Jul 14, 2026',
        excerpt: 'Home only highlights sales-critical work such as paid orders waiting to ship and products running low.',
        content: '<p>Home is intentionally smaller than an app dashboard. It tells you what needs attention before it becomes a customer problem.</p><h2>Current signals</h2><ul><li><strong>Orders to fulfill:</strong> paid orders that are ready for shipping.</li><li><strong>Low-stock products:</strong> items that need replenishment before the next customer order.</li></ul><p>Click a signal to move straight into the related work area.</p>'
      },
      {
        slug: 'create-product-discount', category: 'growth', title: 'Create a product discount that remains clear at checkout', readTime: '6 min read', updatedAt: 'Updated Jul 9, 2026',
        excerpt: 'Use a product discount for eligible simple products and keep it distinct from order-level or shipping discounts.',
        content: '<p>Product, order, and shipping discounts each answer a different customer promise. Keep their labels and calculation bases separate so the final price is explainable everywhere.</p><h2>Use the right discount layer</h2><ul><li>Product discount: applies to eligible simple product lines.</li><li>Order discount: applies to the merchandise amount defined by the offer.</li><li>Shipping discount: applies to the shipping charge.</li></ul><p>When subscriptions are involved, display the subscription benefit and product discount as separate lines.</p>'
      },
      {
        slug: 'july-home-updates', category: 'release-notes', title: 'July: a calmer Home for daily store work', readTime: '2 min read', updatedAt: 'Updated Jul 14, 2026',
        excerpt: 'Home now keeps its focus on fulfillment, stock, performance, store health, recent orders, and announcements.',
        content: '<p>Home no longer repeats App dashboards. The page focuses on core operations that can affect a sale today.</p><h2>What changed</h2><ul><li>Paid orders ready to fulfill appear in Needs attention.</li><li>Low-stock products appear beside fulfillment signals.</li><li>Announcements live at the bottom of Home and can lead to related guidance.</li></ul>'
      }
    ]
  };
})();
