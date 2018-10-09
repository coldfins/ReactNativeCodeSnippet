/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 


import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  ToolbarAndroid,
  Dimensions,
  geolib,
} from 'react-native';
import { StackNavigator, TabView  } from 'react-navigation';

class RestoDetail extends React.Component {
	static navigationOptions = {
		title: 'Restaurant Detail',
	};
	
	
	render() {
		const {state} = this.props.navigation;
	  
		return (
			<View style={styles.mainContainer}>
				<View style={styles.container}>				
					<Image 
						source={{uri: state.params.Restaurant.RestaurantImage}}
						style={styles.mainBackImage}>

					</Image> 
					
					<View style={styles.cuisineMainItem}>
						<Text style={styles.title}>{state.params.Restaurant.RestaurantName}</Text> 
						
						<Text >
							{(() => {
								var cuisine = "";
								for (var i=0; i < state.params.Cuisines.length; i++) {
									if(cuisine == ""){
										cuisine = state.params.Cuisines[i].CuisineName;
									}else{
										cuisine = cuisine + ", " + state.params.Cuisines[i].CuisineName;
									}
								}
								return cuisine;
							})()}
						</Text>
						
						<Text style={styles.cuisineSubText}> {state.params.Restaurant.FavouriteRate}  Ratings </Text>
						<Text style={styles.cuisineSubText}> {state.params.TotalReviews}  Review </Text>	
					</View>
					
				</View>
				
				
					
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	
	container: {
		borderRadius: 2,
		shadowColor: "#000000",
		shadowOpacity: 0.5,
		shadowRadius: 1,
		shadowOffset: {
			height: 2,
			width: 0.5,
		},
		backgroundColor: "#FFFFFF",
	},
	
	tabContainer: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	
	tab: {
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 10,
		marginRight: 10,
		
	},
	
	mainBackImage: { 
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 5,
		marginRight: 5,
		
		width:Dimensions.get('window').width - 10,
		height: Dimensions.get('window').height/3.7, 
	},
	
	title: { 
		fontSize: 20, 
		textAlign: 'left', 
		color: 'black',
	}, 
	
	cuisineText: { 
		fontSize: 16, 
		color: 'black',
	}, 
	cuisineMainItem: {
		padding: 10, 
	},

	cuisineSubText: { 
		fontSize: 14, 
		color: '#B92B27',
	},
	
});
export default RestoDetail;