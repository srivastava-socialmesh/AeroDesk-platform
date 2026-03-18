export function RoomInventory() {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Room Inventory</h2>
      <div className="space-y-3">
        <div className="flex justify-between p-3 bg-gray-50 rounded">
          <span>Deluxe Rooms</span>
          <span className="font-semibold">45 available</span>
        </div>
        <div className="flex justify-between p-3 bg-gray-50 rounded">
          <span>Executive Suites</span>
          <span className="font-semibold">12 available</span>
        </div>
        <div className="flex justify-between p-3 bg-gray-50 rounded">
          <span>Presidential Suite</span>
          <span className="font-semibold">2 available</span>
        </div>
      </div>
    </div>
  );
}
