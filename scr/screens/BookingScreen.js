import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button, Image, TouchableOpacity } from 'react-native';

function BookingScreen ()  {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filter, setFilter] = useState({ date: '', status: '', serviceType: '' });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch bookings on mount and when page changes
    fetchBookings();
  }, [page, filter]);

  const fetchBookings = async () => {
    // Replace with actual API call or data source
    const fetchedBookings = await getBookings(page, filter);
    if (page === 1) {
      setBookings(fetchedBookings);
    } else {
      setBookings((prevBookings) => [...prevBookings, ...fetchedBookings]);
    }
  };

  const getBookings = (page, filter) => {
    // Dummy data for bookings, should be replaced with API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: Math.random(),
            date: '2024-11-21',
            serviceType: 'AC Repair',
            price: 'NRS 500',
            status: 'Confirmed',
            location: 'Kathmandu',
            image: require('../images/AC.jpeg'),
          },
          {
            id: Math.random(),
            date: '2024-11-22',
            serviceType: 'Plumbing',
            price: 'NRS 300',
            status: 'Pending',
            location: 'Lalitpur',
            image: require('../images/plumber.jpg'),
          },
        ]);
      }, 1000);
    });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setPage(1);
    fetchBookings();
    setIsRefreshing(false);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const filterBookings = (item) => {
    const { date, status, serviceType } = filter;
    if (
      (date && !item.date.includes(date)) ||
      (status && item.status !== status) ||
      (serviceType && item.serviceType !== serviceType)
    ) {
      return false;
    }
    return true;
  };

  const filteredBookings = bookings.filter(filterBookings);

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search Bookings"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Filter options */}
      <View style={styles.filterContainer}>
        <Button title="Filter by Date" onPress={() => setFilter({ ...filter, date: '2024-11-21' })} />
        <Button title="Filter by Status" onPress={() => setFilter({ ...filter, status: 'Confirmed' })} />
        <Button title="Filter by Service" onPress={() => setFilter({ ...filter, serviceType: 'AC Repair' })} />
      </View>

      {/* Booking List */}
      <FlatList
        data={filteredBookings}
        renderItem={({ item }) => (
          <View style={styles.bookingCard}>
            <Image source={item.image} style={styles.bookingImage} />
            <View style={styles.bookingDetails}>
              <Text style={styles.bookingDate}>{item.date}</Text>
              <Text style={styles.bookingServiceType}>{item.serviceType}</Text>
              <Text style={styles.bookingPrice}>{item.price}</Text>
              <Text style={styles.bookingStatus}>{item.status}</Text>
              <Text style={styles.bookingLocation}>{item.location}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:60,
    
  },
  searchInput: {
   padding:10,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    margin: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor:'#fff'
  },
  bookingCard: {
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
    elevation: 3,
  },
  bookingImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  bookingDetails: {
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  bookingDate: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  bookingServiceType: {
    color: '#666',
    fontSize: 14,
  },
  bookingPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookingStatus: {
    fontSize: 14,
    color: 'green',
  },
  bookingLocation: {
    fontSize: 14,
    color: '#777',
  },
});

export default BookingScreen;
