var REQUEST_URL = 'http://34.212.127.62/api/KhanaDoApi/getrestaurantsByLocation?Latitude=21.20682716369629&Longitude=72.83724975585938&offset=1&limit=10';

import React from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ListView,
	Image,
	Dimensions,
	Button,
	TouchableHighlight,
	Alert,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import RestoDetail from './RestoDetail';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Eathub',
  };
  
  constructor(props) 
	{
		super(props); 
		this.state = { 
			dataSource: new ListView.DataSource({ 
				rowHasChanged: (row1, row2) => row1 !== row2, 
			}), 
			loaded: false, 
		}; 
	}
	
	componentDidMount() { this.fetchData(); }
	
	_onUserSelected(movie) {
		this.props.navigation.navigate('RestoDetail', {...movie})
	}
	
	render() {
		const { navigate } = this.props.navigation;
	
		if (!this.state.loaded)  { 
			return this.renderLoadingView(); 
		} 
		return ( 
			<View style={styles.container}>
				<ListView 
					dataSource={this.state.dataSource} 
					renderRow={this.renderMovie.bind(this)}						
				/> 
				
			</View>
		);
	}
	
	renderLoadingView() { 
	  return ( 
	  <View style={styles.container}> 
		  <Text> 
			Loading Restaurants... 
		  </Text> 
	  </View> 
	  ); 
	} 
	
	renderMovie(movie, sectionId, rowId, highlightRow) { 
		var feeStyle="";
		{(() => {
			if(movie.Restaurant.DeliveryFee == 0){
				feeStyle = styles.hiddenContainer;
			}else{
				feeStyle = "";
			}
		})()}
	
		return ( 
		<TouchableHighlight onPress={() => this._onUserSelected(movie)}  underlayColor='#B92B27'>
			<View style={styles.card}>			
				<Image 
					source={{uri: movie.Restaurant.RestaurantImage}}
					style={styles.mainBackImage}>

					<Text style={styles.textOpenNow}>Open Now </Text> 
					
					<View style={styles.rightContainer}> 
						<Text style={styles.title}>{movie.Restaurant.RestaurantName}</Text> 
						<Text style={styles.subTitle}>
						{(() => {
							if(movie.Restaurant.OnlinePaymentAvailable){
								return "Online payment available";
							}else{
								return "Online payment NOT available";
							}
						})()}
						</Text> 
			
						<View style={styles.containerSubItem}> 
							<Image 
								source={require("./images/rupee.png")}
								style={[styles.rupeesIcon, feeStyle]}
							/> 

							<Text style={styles.rupeesText}>
							{(() => {
								if(movie.Restaurant.DeliveryFee != 0){
									return movie.Restaurant.MinimumOrderAmount + " Delivery fee";
								}else{
									return "Free Delivery";
								}
							})()}
							</Text> 
							<View style={{width: 2, height: 20, backgroundColor: 'white', marginLeft: 10, }} />
							<Image 
								source={require("./images/rupee.png")}
								style={[styles.rupeesIcon]}
							/> 
							<Text style={styles.rupeesText}>{movie.Restaurant.MinimumOrderAmount}  Min. order </Text>
	
						</View>
						
						<View style={styles.containerDistance}> 
								<Image 
									source={require("./images/distance.png")}
									style={styles.distanceThumb}
								/> 
								<Text style={styles.distanceText}>  
									{(() => {
										var lat1 = 21.20682716369629;
										var lon1 = 72.83724975585938;
										var lat2 = movie.Restaurant.Latitude;
										var lon2 = movie.Restaurant.Longitude;
										
										var R = 6371; // Radius of the earth in km
										var dLat = (lat2-lat1) * (Math.PI/180);  // deg2rad below
										var dLon = (lon2-lon1) * (Math.PI/180); 
										var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
										var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
										var d = R * c; // Distance in km
										d = Math.ceil(d);
										return d + " Km.";
									})()}
									
								</Text>
							</View>
						
					</View> 
					
				</Image> 
				
				<View style={styles.cuisineMainItem}>
					<Text style={styles.cuisineText}>
						{(() => {
							var cuisine = "";
							for (var i=0; i < movie.Cuisines.length; i++) {
								if(cuisine == ""){
									cuisine = movie.Cuisines[i].CuisineName;
								}else{
									cuisine = cuisine + ", " + movie.Cuisines[i].CuisineName;
								}
							}
							return cuisine;
						})()}
					</Text>
				</View>
				
				<View style={styles.cuisineEndItem}>
						<Text style={styles.cuisineSubText}> {movie.TotalReviews}  Review </Text>	
						<Image 
							source={require("./images/dot.png")}
							style={styles.cuisineThumb}
						/> 					
						<Text style={styles.cuisineSubText}> {movie.Restaurant.FavouriteRate}  Ratings </Text>
					
					</View>
			
			</View> 
		</TouchableHighlight>
		); 
		
	}

	fetchData() {
		fetch(REQUEST_URL)
		.then((response) => response.json())
		.then((responseData) => {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(responseData.Restaurants),
				loaded: true,
			});
		})
	  .done();
	}
	
}

const EatHub = StackNavigator({
  Home: { screen: HomeScreen },
  RestoDetail: { screen: RestoDetail },
});


const styles = StyleSheet.create({
	toolbar: {
		backgroundColor: '#B92B27',
		height: 60,
		alignSelf: 'stretch',
		justifyContent: 'center', 
	}, 
 
	card: {
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 5,
		marginRight: 5,
		width:Dimensions.get('window').width - 10,
		backgroundColor: "#FFFFFF",
		borderRadius: 2,
		shadowColor: "#000000",
		shadowOpacity: 0.5,
		shadowRadius: 1,
		shadowOffset: {
			height: 2,
			width: 0.5,
		}
	},
 
	textOpenNow: { 
		alignSelf: 'flex-end',  
		fontSize: 15, 
		backgroundColor: "#B92B27",
		textAlign: 'right', 
		color: 'white',
		padding: 5,
	},
 
	title: { 
		fontSize: 20, 
		marginLeft: 10, 
		textAlign: 'left', 
		color: 'white',
	}, 
	subTitle: { 
		justifyContent: 'center', 
		textAlign: 'left', 
		marginLeft: 10, 
		color: 'white',
	},
	
	mainBackImage: { 
		width:Dimensions.get('window').width - 10,
		height: Dimensions.get('window').height/3.7, 
	},
 
	container: {
		flex: 1, 
	},
  
	containerNew: {
		flex: 1, 
	},
	
	containerSubItem: {
		flex: 1,
		flexDirection: 'row', 
	},
	
	containerDistance: { 
		alignSelf: 'flex-end', 
		flexDirection: 'row',
		margin: 10,
	},
	distanceThumb: { 
		width: 20, 
		height: 20, 
	},
	distanceText: { 
		color: 'white',
		marginLeft: 5,
		marginRight: 10,
	},
	
	rupeesIcon: {
		justifyContent: 'center', 	  
		width: 20, 
		height: 20, 
		marginLeft: 10, 
    },
	rupeesText: { 
		justifyContent: 'center', 
		textAlign: 'left', 
		color: 'white',
	},
	hiddenContainer: {
		width: 0, 
		height: 0, 
	},

	listView: { 
		marginTop: 10,
	},
	rowViewContainer: {
		flex: 1,
		height: StyleSheet.hairlineWidth,
		marginTop: 10,
		marginBottom: 10,
    }, 
	
	rightContainer: { 
		flex: 1, 
		marginTop: Dimensions.get('window').height/3.7/4
	},
 
	cuisineMainItem: {
		padding: 10, 
	},
	
	cuisineEndItem: {
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 10,
		alignSelf: 'flex-end', 
		flexDirection: 'row', 
	},
	cuisineText: { 
		fontSize: 16, 
		color: 'black',
	}, 
	cuisineSubText: { 
		fontSize: 14, 
		color: '#B92B27',
	},
	cuisineThumb: { 
		marginLeft: 5,
		marginRight: 5,
		marginTop: 7,
		width: 7,
		height: 7,
	},
	
 });


AppRegistry.registerComponent('EatHub', () => EatHub);
