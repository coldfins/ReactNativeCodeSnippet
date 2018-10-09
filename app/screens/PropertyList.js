import React, { Component } from 'react';

import { List, ListItem } from 'react-native-elements';

import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Dimensions,
  ScrollView,
  ActivityIndicatorIOS
} from 'react-native';

var REQUEST_URL = 'http://13.58.33.217:82/api/get_all_properties_list';

class PropertyList extends Component {
  
  onLearnMore = (property) => {
    this.props.navigation.navigate('Details', { ...property });
  };
  
  render() {
   	 	return (
       	 	<ListView
           		 dataSource={this.state.dataSource}
           		 renderRow={this.renderProperty.bind(this)}
           		 style={styles.listView}
            />
    	);
	}

	constructor(props) {
       super(props);
       this.state = {
           isLoading: true,
           dataSource: new ListView.DataSource({
               rowHasChanged: (row1, row2) => row1 !== row2
           })
       };
    }
   
   componentDidMount() {
       this.fetchData();
   }
   
   fetchData() {
       fetch(REQUEST_URL)
       .then((response) => response.json())
       .then((responseData) => {
           this.setState({
               dataSource: this.state.dataSource.cloneWithRows(responseData.properties_lists),
               isLoading: false
           });
       })
       .done();
   }
   
   renderLoadingView() {
    return (
        <View style={styles.loading}>
            <ActivityIndicatorIOS
                size='large'/>
            <Text>
                Loading property...
            </Text>
        </View>
    );
  }
  	
	showPropertyDetail(property) {
       this.props.navigator.push({
           title: property.bhktype,
           tintColor:'#fff',
           leftButtonIcon: require('../Image/back_white.png'),
           onLeftButtonPress: () => this._handleNavigationRequest(),
           component: PropertyDetail,
           passProps: {property}
       });
   }
   
   _handleNavigationRequest() { 
   		this.props.navigator.pop();
  }

   renderProperty(property) {
       return (
            <TouchableHighlight onPress={() => this.onLearnMore(property)}  underlayColor='#dddddd'>
                <View style={{height: 178}}>
                    <View style={styles.container}>
                        <Image
                            source={{uri: property.propertyphoto_url}}
                            style={styles.image}>
                        <Image
                            source={require('../Image/Shadow.png')}
                            style={styles.overlayImage}>
						<Text style={styles.textPropertyType}>FOR {property.property_for.toUpperCase()}</Text>
                        <View style={styles.image}>
                            <Text style={styles.title}>{property.bhktype} {property.propertytypes} - {property.address}</Text>
                            <Text style={styles.city}>{property.city}</Text>
                            <Text style={styles.admin}>{property.user_contact_no}</Text>
                        </View>
                        </Image>
                        </Image>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
       );
   }

}

var styles = StyleSheet.create({
	container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    image: {
    	flex: 1,
    },
    overlayImage: {
   	    flex: 1,
		width: null,
		height: null
    },
    rightContainer: {
        flex: 2
    },
    textPropertyType: { 
  		alignSelf: 'flex-end',  
  		fontSize: 14, 
  		backgroundColor: "#e91e63",
  		textAlign: 'right', 
  		color: 'white',
 		padding: 5,
	 },
	title: {
        flex: -1,
        fontSize: 16,
        backgroundColor: 'rgba(0,0,0,0)',
        marginBottom: 6,
        marginTop: 30,
        marginLeft: 10,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    city: {
        flex: 1,
    	fontSize: 15,
    	marginBottom: 6,
    	marginLeft: 10,
    	backgroundColor: 'rgba(0,0,0,0)',
    	fontWeight: 'bold',
        color: '#FFFFFF'
    },
    admin: {
    	flex: 1,
        color: '#FFFFFF',
        marginLeft: 10,
        fontWeight: 'bold',
        backgroundColor: 'rgba(0,0,0,0)'
    },
	separator: {
       height: 0,
       backgroundColor: '#dddddd'
    },	
	listView: {
       backgroundColor: '#F5FCFF'
    },
    loading: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
    }
});

export default PropertyList;
