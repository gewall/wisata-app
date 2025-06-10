import { Image } from "expo-image";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, useColorScheme, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type DataWisata = {
  id: string;
  nama: string;
  deskripsi: string;
  alamat: string;
  slug: string;
  sampul: string;
};

const Home = () => {
  const colors = useColorScheme();
  const [dataWisata, setDataWisata] = useState<DataWisata[]>([]);

  const getDataWisata = async () => {
    try {
      const req = await fetch("https://wisata-six.vercel.app/api/wisata");
      const res = await req.json();
      setDataWisata(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDataWisata();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Stack.Screen options={{ headerShown: false, title: "Home" }} /> */}
      <View
        style={{
          paddingVertical: 25,
          paddingHorizontal: 25,
          backgroundColor: colors === "dark" ? "#000" : "#fff",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          variant="bodyLarge"
          style={{
            color: colors === "dark" ? "#fff" : "#000",
          }}
        >
          Selamat datang!
        </Text>
        <View style={{ height: 50 }}>
          <Image
            source={require("../../assets/images/logo.jpg")}
            style={{
              flex: 1,
              width: 50,
              height: 50,
              borderRadius: 10,
            }}
            contentFit="cover"
          />
        </View>
      </View>

      <View
        style={{
          padding: 25,
          margin: 15,
          backgroundColor: "#B9D4AA",
          borderRadius: 10,
        }}
      >
        <Text
          variant="bodyLarge"
          style={{ color: colors === "dark" ? "#fff" : "#000" }}
        >
          Kami akan merekomendasikan wisata di Majalengka untuk Anda!
        </Text>
      </View>
      <FlatList
        data={dataWisata}
        keyExtractor={(item) => item?.id}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: "/(main)/detail/[id]",
              params: { id: item.slug },
            }}
            asChild
          >
            <Pressable
              style={{
                padding: 15,
                marginVertical: 5,
                backgroundColor: colors === "dark" ? "black" : "white",
                borderRadius: 10,
                marginHorizontal: 15,
                shadowColor: "#000",
                flex: 1,
                flexDirection: "row",
                borderWidth: colors === "dark" ? 1 : 0,
                borderColor: colors === "dark" ? "#333446" : "#000",
                gap: 10,
              }}
            >
              <Image
                source={`https://res.cloudinary.com/djh210frq/image/upload/v1738656191/${item?.sampul}.jpg`}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                }}
                contentFit="cover"
              />
              <View style={{ flex: 1 }}>
                <Text
                  variant="bodyLarge"
                  style={{ color: colors === "dark" ? "#fff" : "#000" }}
                >
                  {item?.nama}
                </Text>
                <Text
                  variant="bodySmall"
                  style={{
                    color: colors === "dark" ? "#fff" : "#000",
                    marginVertical: 5,
                  }}
                >
                  {item?.alamat}
                </Text>
              </View>
            </Pressable>
          </Link>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
