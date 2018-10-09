/**
 * Created by Coldfin on 07/22/17.
 */

'use strict';

import React, { Component } from 'react';
import MapView from 'react-native-maps';

import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  ScrollView,
  View
} from 'react-native';


class PropertyDetail extends Component {
    render() {
    
	    var property = this.props.navigation.state.params
        var imageURI = (typeof property.propertyphoto_url !== 'undefined') ? property.propertyphoto_url : '';
        var description = (typeof property.description !== 'undefined') ? property.description : '';
        return (
        
        <ScrollView vertical ref='scrollWrap' contentContainerStyle={{marginTop:-70}}>
            <View style={styles.container}>
                <Image style={styles.image} source={{uri: imageURI}}>
                <Text style={styles.amount}>₹ {property.rate}</Text>
                </Image>
                <View style={styles.card} height={120}>
                	 <Text style={styles.title}>Property Type</Text>
               		 <Text style={styles.subTitle}>{property.bhktype} {property.propertytypes}</Text>
                	 <Text style={styles.address}>{property.address}, {property.area}, {property.city}</Text>
               	</View>	
                <View style={styles.card} height={120}>
                  	 <Text style={styles.title}>Property Description</Text>
               		 <Text style={styles.description} numberOfLines={4} ellipsizeMode="tail">{description}</Text>
               	</View>
                <View style={styles.card} height={200}>
                  	 <Text style={styles.title}>Explore Map</Text>
        			 <MapView style={{height: 162}} showsUserLocation={true}  
        		 			initialRegion={{
              						latitude: property.latitude,
              						longitude: property.longitude,
              						latitudeDelta: 0.0,
              						longitudeDelta: 0.0,
         		 			}}
         				>
        				<MapView.Marker
            				coordinate={{
            						latitude: property.latitude,
            						longitude: property.longitude
            				}}
           	 						title={property.bhktype}
            						description={property.address}
         				/>
      				  </MapView>
               	</View>     
           </View>
        </ScrollView>
     
        );
    }
 
}

var styles = StyleSheet.create({

    container: {
        marginTop: 75,
        flex: 1,
        alignItems: 'center'
    },
    
    rightContainer: {
        flex: 2
    },
    image: {
        width:Dimensions.get('window').width - 10,
  		height:Dimensions.get('window').height/4,
        padding: 10
    },
    subTitle: {
        padding: 10,
        height:45,
        fontSize: 14,
        color: '#656565'
    },
    address: {
   		height:45,
   		marginTop: -15,
        padding: 10,
        fontSize: 14,
        color: '#000000'
    },
    amount: {
   	    marginTop: 100,
		marginLeft: Dimensions.get('window').width/1.4,
        padding: 10,
        fontSize: 15,
        width:120,
        backgroundColor: "#e91e63",
        color: '#FFFFFF'
    },
    title: {
        padding: 10,
        fontSize: 15,
        backgroundColor: "#f2f3f4",
        color: '#000000'
    },
    description: {
        padding: 10,
        fontSize: 12,
        color: '#656565'
    },
    card: {
   		marginTop: 10,
    	width:Dimensions.get('window').width - 10,
    	backgroundColor: "#fff",
    	borderRadius: 2,
    	shadowColor: "#000000",
    	shadowOpacity: 0.5,
    	shadowRadius: 1,
    	shadowOffset: {
      		height: 2,
      		width: 0.5,
    	}
	},
	 map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }
});

module.exports = PropertyDetail;