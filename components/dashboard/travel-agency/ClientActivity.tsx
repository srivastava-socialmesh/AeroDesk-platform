export function ClientActivity() {
  const clients = [
    { name: 'Rajesh Kumar', bookings: 5, spent: 450000, lastActive: '2024-03-15' },
    { name: 'Priya Singh', bookings: 3, spent: 280000, lastActive: '2024-03-14' },
    { name: 'Anand Menon', bookings: 2, spent: 165000, lastActive: '2024-03-12' },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Client Activity</h2>
      <div className="space-y-3">
        {clients.map((client, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">{client.name}</p>
              <p className="text-sm text-gray-600">{client.bookings} bookings • ₹{(client.spent/1000).toFixed(0)}K spent</p>
            </div>
            <span className="text-xs text-gray-500">Last: {client.lastActive}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
