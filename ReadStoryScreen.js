import React from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import db from "../Config";

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default class ReadStoryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      storiesInDB: [],
      search: "",
      searchResults: [],
    };
  }

  retrieveStories = () => {
    var allStories = [];
    var dbStories = db
      .collection("stories")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          allStories.push(doc.data());
          // console.log(allStories);
        });
        this.setState({ storiesInDB: allStories });
      });

    this.setState({ storiesInDB: allStories });
  };

  searchFilter = (searchInput) => {
    console.log("Search Filter function is called");
    if (searchInput != "") {
      var results = this.state.storiesInDB
        .where("Title", "==", searchInput)
        .get();
      var resultsData = results.data();
      this.setState({ searchResults: resultsData });
      console.log("if condition");
    } else {
      this.setState({ searchResults: this.state.storiesInDB });
      console.log("else condition");
    }
  };

  componentDidMount() {
    this.retrieveStories();
    // const allStories = await db.collection("stories").get();

    // allStories.docs.map((doc) => {
    //   this.setState({
    //     storiesInDB: [...this.state.storiesInDB, doc.data()],
    //   });
    // });
  }
  renderItem = ({ item }) => <Item title={item.Title} />;
  render() {
    return (
      // <View>
      //    <Header
      //     backgroundColor={"#FF0038"}
      //     centerComponent={{
      //       text: "Story Hub",
      //       style: { color: "#EEE", fontSize: 20, fontWeight: "bold" },
      //     }}
      //   />
      //   <View>
      //     <TextInput
      //       style={styles.searchText}
      //       placeholder="Search for a story title"
      //       onChangeText={(search) => {
      //         this.searchFilter(search);
      //         this.setState({ search: search });
      //       }}
      //       value={this.state.search}
      //     />
      <SafeAreaView style={styles.container}>
        {console.log(this.state.storiesInDB)}
        {/* <FlatList
          data={this.state.storiesInDB}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
        /> */}
        <FlatList
          data={this.state.allStories}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text>Title: {item.Title}</Text>
              <Text>Author : {item.AuthorName}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        {/* <FlatList
                  data={this.state.storiesInDB}
          renderItem={({ item }) => {
            <View style={{ flex: 1 }}>
              <Text>Title: {item.Title}</Text>
              <Text>Author: {item.AuthorName}</Text>
            </View>;
          }}
          keyExtractor={(item, index) => index.toString()}
        /> */}
        {/* <ScrollView>
          {this.state.storiesInDB.map((read, index) => {
            return (
              <View
                key={index}
                style={{
                  borderBottomWidth: 2,
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <Text>{"Story Name: " + read.Title}</Text>
                <Text>{"Story Author: " + read.AuthorName}</Text>
                <Text>{"Pages: " + read.Story}</Text>
              </View>
            );
          })}
        </ScrollView> */}
      </SafeAreaView>
      //</View>

      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  searchText: {
    height: 35,
    width: "70%",
    borderWidth: 1.5,
    alignSelf: "center",
    borderWidth: 1.5,
    fontSize: 20,
    backgroundColor: "#FFF",
    margin: 20,
  },
  scrollView: {
    backgroundColor: "#FFEFEF",
    marginHorizontal: 15,
    textAlign: "center",
  },
  scrollViewText: {
    color: "#000",
    fontSize: 15,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  itemContainer: {
    height: 80,
    width: "100%",
    borderWidth: 2,
    borderColor: "pink",
    justifyContent: "center",
    alignSelf: "center",
  },
});
