import { Image, Text, View } from "react-native";

import { icons } from "@/constants";
import { formatDate, formatTime } from "@/lib/utils";
import { Ride } from "@/types/type";

const RideCard = ({ ride }: { ride: Ride }) => {
   

  //console.log(ride);
  debugger;
  return (
    <View className="flex flex-row items-center justify-center bg-white shadow-neutral-300">
     <View className="bg-gray-100 border border-gray-300 rounded-lg shadow-md p-2 w-full mt-4">
  {/* Top Section - Map + Addresses */}
  <View className="flex flex-row items-start justify-between gap-x-4">
    <Image
      source={{
        uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${ride?.destination_longitude},${ride?.destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
      }}
      className="rounded-lg w-[30%] min-w-[70px] max-w-[100px] h-[90px]"
      resizeMode="cover"
    />

    <View className="flex flex-col justify-between flex-1 ml-3 gap-y-3">
      {/* Origin */}
      <View className="flex flex-row items-center flex-wrap gap-x-2 mt-3">
        <Image source={icons?.to} className="w-5 h-5" />
        <Text
          className="text-md font-JakartaMedium flex-shrink"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {ride?.origin_address}
        </Text>
      </View>

      {/* Destination */}
      <View className="flex flex-row items-center flex-wrap gap-x-2 mt-3">
        <Image source={icons.point} className="w-5 h-5" />
        <Text
          className="text-md font-JakartaMedium flex-shrink"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {ride.destination_address}
        </Text>
      </View>
    </View>
  </View>

  {/* Divider */}
  <View className="border-t border-gray-200 my-4" />

  {/* Ride Details */}
  <View className="flex flex-col gap-y-3">
    <View className="flex flex-row items-center justify-between flex-wrap">
      <Text className="text-md font-JakartaMedium text-gray-500">
        Date & Time
      </Text>
      <Text
        className="text-md font-JakartaBold"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {formatDate(ride?.created_at)}, {formatTime(ride?.ride_time)}
      </Text>
    </View>

    <View className="flex flex-row items-center justify-between flex-wrap">
      <Text className="text-md font-JakartaMedium text-gray-500">Driver</Text>
      <Text
        className="text-md font-JakartaBold"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {ride?.driver?.first_name} {ride?.driver?.last_name}
      </Text>
    </View>

    <View className="flex flex-row items-center justify-between flex-wrap">
      <Text className="text-md font-JakartaMedium text-gray-500">
        Car Seats
      </Text>
      <Text className="text-md font-JakartaBold">
        {ride?.driver?.car_seats}
      </Text>
    </View>

    <View className="flex flex-row items-center justify-between flex-wrap">
      <Text className="text-md font-JakartaMedium text-gray-500">
        Payment Status
      </Text>
      <Text
        className={`text-md capitalize font-JakartaBold ${
          ride?.payment_status === "paid" ? "text-green-500" : "text-red-500"
        }`}
      >
        {ride?.payment_status}
      </Text>
    </View>
  </View>
</View>

    </View>
  );
};

export default RideCard;
