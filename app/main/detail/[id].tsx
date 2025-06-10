import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  useColorScheme,
  View,
} from "react-native";
import { Text } from "react-native-paper";

type Props = {};

const DetailWisata = (props: Props) => {
  const { id } = useLocalSearchParams();
  const colors = useColorScheme();

  const [data, setData] = React.useState<any>(null);

  const getDataWisata = async () => {
    try {
      const req = await fetch(`https://wisata-six.vercel.app/api/wisata/${id}`);
      const res = await req.json();
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    getDataWisata();
  }, []);

  console.log(id, data);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors === "dark" ? "#000" : "#fff" }}
    >
      <ScrollView>
        {data && (
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={`https://res.cloudinary.com/djh210frq/image/upload/v1738656191/${data.sampul}.jpg`}
                style={{
                  flex: 1,
                  width: "100%",
                  height: 250,
                }}
                contentFit="cover"
              />
            </View>
            <View style={{ flex: 1, margin: 15 }}>
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    marginBottom: 10,
                    color: colors === "dark" ? "#fff" : "#000",
                  }}
                  variant="headlineLarge"
                >
                  {data.nama}
                </Text>
                <Text
                  variant="bodyLarge"
                  style={{
                    marginBottom: 10,
                    color: colors === "dark" ? "#fff" : "#000",
                  }}
                >
                  {data.deskripsi}
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    marginTop: 10,
                    maxWidth: "80%",
                    gap: 10,
                  }}
                >
                  <Text style={{ color: colors === "dark" ? "#fff" : "#000" }}>
                    Alamat:
                  </Text>
                  <Text style={{ color: colors === "dark" ? "#fff" : "#000" }}>
                    {data.alamat}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    marginTop: 10,
                    maxWidth: "80%",
                    gap: 10,
                  }}
                >
                  <Text style={{ color: colors === "dark" ? "#fff" : "#000" }}>
                    Telepon:
                  </Text>
                  <Text style={{ color: colors === "dark" ? "#fff" : "#000" }}>
                    {data.telepon}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    marginTop: 10,
                    maxWidth: "80%",
                    gap: 10,
                  }}
                >
                  <Text style={{ color: colors === "dark" ? "#fff" : "#000" }}>
                    Rating:
                  </Text>
                  <Text style={{ color: colors === "dark" ? "#fff" : "#000" }}>
                    {data.rating}
                  </Text>
                </View>
              </View>

              <View style={{ flex: 1, marginTop: 20 }}>
                <Text
                  variant="headlineSmall"
                  style={{
                    textAlign: "center",
                    marginBottom: 10,
                    color: colors === "dark" ? "#fff" : "#000",
                  }}
                >
                  Galeri
                </Text>
                <FlatList
                  data={data.galeri.split(",")}
                  horizontal
                  keyExtractor={(item) => item + Math.random().toString()}
                  renderItem={({ item }) => (
                    <Image
                      source={`https://res.cloudinary.com/djh210frq/image/upload/v1738656191/${item}.jpg`}
                      style={{
                        flex: 1,
                        width: 200,
                        height: 200,
                        borderRadius: 10,
                        marginVertical: 5,
                      }}
                      contentFit="cover"
                    />
                  )}
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailWisata;
