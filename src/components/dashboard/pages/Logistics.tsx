import React, { useState, useMemo } from "react";
import { Search, Filter, MoreVertical } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

const Logistics: React.FC = () => {
  const [sortBy, setSortBy] = useState<"date" | "status" | "location">("date");
  const [searchQuery, setSearchQuery] = useState("");

  // Sort and filter orders
  const sortedOrders = useMemo(() => {
    let filtered = orders.filter((order) =>
      Object.values(order).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "status":
          return a.status.localeCompare(b.status);
        case "location":
          return a.location.localeCompare(b.location);
        default:
          return 0;
      }
    });
  }, [sortBy, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 rounded-full">🚛</div>
            <span className="text-sm text-gray-500">Total Shipments</span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold">534</span>
            <span className="text-green-500 text-sm ml-2">+21%</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 rounded-full">✅</div>
            <span className="text-sm text-gray-500">Completed</span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold">109</span>
            <span className="text-green-500 text-sm ml-2">+21%</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-yellow-50 rounded-full">⏳</div>
            <span className="text-sm text-gray-500">Pending</span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold">293</span>
            <span className="text-green-500 text-sm ml-2">+21%</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-50 rounded-full">↩️</div>
            <span className="text-sm text-gray-500">Returns</span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold">23</span>
            <span className="text-red-500 text-sm ml-2">-10%</span>
          </div>
        </div>
      </div>

      {/* Shipment Analytics Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Shipment Analytics</h3>
        <div className="grid grid-cols-9 gap-2 h-64">
          {Array.from({ length: 72 }).map((_, i) => (
            <div
              key={i}
              className={`rounded ${
                Math.random() > 0.5
                  ? "bg-emerald-100"
                  : Math.random() > 0.5
                  ? "bg-emerald-300"
                  : "bg-emerald-500"
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between mt-4 text-sm text-gray-500">
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
          <span>Jul</span>
          <span>Aug</span>
          <span>Sep</span>
          <span>Oct</span>
          <span>Nov</span>
        </div>
      </div>

      {/* Order List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Order List</h3>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  className="pl-9 w-[300px]"
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select
                value={sortBy}
                onValueChange={(value: any) => setSortBy(value)}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                    <SelectItem value="location">Location</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        {order.customer[0]}
                      </div>
                      <div className="ml-4">{order.customer}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">#{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.status === "Complete"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const orders = [
  {
    id: "6275",
    customer: "Rajesh Sharma",
    date: "8 Aug 2024",
    location: "Kishanpole Bazaar, Jaipur",
    status: "Complete",
  },
  {
    id: "8612",
    customer: "Priya Patel",
    date: "10 August, 2024",
    location: "Sardar Market, Jodhpur",
    status: "On Delivery",
  },
  {
    id: "1074",
    customer: "Amit Singh",
    date: "12 August, 2024",
    location: "Clock Tower, Udaipur",
    status: "Complete",
  },
  {
    id: "7356",
    customer: "Meera Kumari",
    date: "19 August, 2024",
    location: "Pushkar Market, Ajmer",
    status: "On Delivery",
  },
  {
    id: "0164",
    customer: "Suresh Agarwal",
    date: "20 August, 2024",
    location: "Sadar Bazaar, Bikaner",
    status: "Complete",
  },
];

export default Logistics;
