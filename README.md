# Route Link UI Field for Jira

A Forge custom field for Jira that provides a convenient way to view a route between two addresses in Google Maps.

## Description

This custom field displays a "View Route in Google Maps" button that, when clicked, opens Google Maps in a new tab with directions between two addresses (pickup and delivery) that are stored in other custom fields within the Jira issue.

## Features

- Displays a button that links directly to Google Maps
- Automatically generates a route between pickup and delivery addresses
- Opens the route in a new tab
- Read-only field that doesn't allow direct editing

## Prerequisites

- Atlassian Forge CLI
- Node.js 22.x
- Jira Cloud instance with admin access

## Installation

1. Install the Forge CLI:
   ```
   npm install -g @forge/cli
   ```

2. Clone this repository:
   ```
   git clone <repository-url>
   cd routelink-ui-field
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Deploy to your Forge app:
   ```
   forge deploy
   ```

5. Install the app in your Jira instance:
   ```
   forge install
   ```

## Configuration

This custom field relies on two other custom fields in your Jira instance:

- `customfield_10062`: Pickup address
- `customfield_10063`: Delivery address

You may need to update these field IDs in the code to match your Jira instance's configuration.

## Usage

Once installed and configured:

1. Add the "Route" custom field to your Jira issue screens
2. When viewing an issue with pickup and delivery addresses, the field will display a "View Route in Google Maps" button
3. Click the button to open Google Maps with the route between the addresses

## Dependencies

- @forge/bridge: 4.5.0
- @forge/react: 11.0.0
- React: 18.2.0

## License

MIT
