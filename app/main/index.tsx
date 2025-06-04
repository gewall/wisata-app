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
            href={{ pathname: "/main/detail/[id]", params: { id: item.slug } }}
            asChild
          >
            <Pressable
              style={{
                padding: 15,
                marginVertical: 5,
                backgroundColor: "white",
                borderRadius: 10,
                marginHorizontal: 15,
                shadowColor: "#000",
              }}
            >
              <Text
                variant="bodyLarge"
                style={{ color: colors === "dark" ? "#fff" : "#000" }}
              >
                {item?.nama}
              </Text>
            </Pressable>
          </Link>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
