import React, { useState, useEffect } from 'react';
import ForgeReconciler, {
  Link,
  Text,
  Strong,
} from "@forge/react";
import { view, requestJira } from '@forge/bridge';

const View = () => {
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssueDetails = async () => {
      try {
        console.log('Fetching issue context...');
        const context = await view.getContext();
        const issueKey = context.extension.issue.key;
        console.log(`Issue key: ${issueKey}`);
        
        console.log('Fetching issue details...');
        const response = await requestJira(`/rest/api/3/issue/${issueKey}`);
        
        if (!response.ok) {
          console.error(`Failed to fetch issue data: ${response.status}`);
          setError('Failed to fetch issue data');
          setLoading(false);
          return;
        }
        
        const data = await response.json();
        console.log('Issue data fetched successfully');
        
        // Get the pickup and delivery addresses from the custom fields
        // Note: You'll need to replace these with your actual custom field IDs
        console.log('Checking for custom fields...');
        console.log(`Custom fields available: ${Object.keys(data.fields).filter(key => key.startsWith('customfield_')).join(', ')}`);
        
        const pickupAddress = data.fields.customfield_10062 || '';
        const deliveryAddress = data.fields.customfield_10063 || '';
        
        console.log(`Pickup address: ${pickupAddress}`);
        console.log(`Delivery address: ${deliveryAddress}`);
        
        // If addresses are missing, return error
        if (!pickupAddress || !deliveryAddress) {
          console.log('Missing address information');
          setError('Missing address information');
          setLoading(false);
          return;
        }
        
        setRouteData({
          startString: pickupAddress,
          endString: deliveryAddress
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching issue details:', error);
        setError('Failed to load route data');
        setLoading(false);
      }
    };
    
    fetchIssueDetails();
  }, []);

  const getGoogleMapsUrl = () => {
    if (routeData) {
      try {
        // Format: https://www.google.com/maps/dir/?api=1&origin=ADDRESS1&destination=ADDRESS2&travelmode=driving
        return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(routeData.startString)}&destination=${encodeURIComponent(routeData.endString)}&travelmode=driving`;
      } catch (err) {
        console.error('Error generating Google Maps URL:', err);
        return 'https://www.google.com/maps';
      }
    }
    return 'https://www.google.com/maps';
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <>
      <Link 
        href={getGoogleMapsUrl()}
        appearance="button"
        target="_blank"
      >
        View Route in Google Maps
      </Link>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <View />
  </React.StrictMode>
);
