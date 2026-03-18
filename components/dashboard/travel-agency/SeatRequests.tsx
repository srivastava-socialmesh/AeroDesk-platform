export function SeatRequests() {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Seat Requests</h2>
      <div className="space-y-3">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Mumbai → Delhi</span>
            <span className="text-sm text-yellow-600 bg-yellow-50 px-2 py-1 rounded">Pending</span>
          </div>
          <p className="text-sm text-gray-600">Client: Rajesh Kumar • 2 seats</p>
          <div className="mt-2 flex space-x-2">
            <button className="px-3 py-1 bg-green-600 text-white text-sm rounded">Approve</button>
            <button className="px-3 py-1 bg-red-600 text-white text-sm rounded">Reject</button>
          </div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Delhi → Bangalore</span>
            <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">Approved</span>
          </div>
          <p className="text-sm text-gray-600">Client: Priya Singh • 3 seats</p>
        </div>
      </div>
    </div>
  );
}
