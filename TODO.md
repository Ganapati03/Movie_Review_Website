# TODO List

## OMDB API Key Setup
- [x] Get a free OMDB API key from https://www.omdbapi.com/apikey.aspx
- [ ] Update backend/.env file with the new API key: OMDB_API_KEY=5841386a
- [ ] Restart the backend server to load the new environment variable
- [ ] Test the movie listing to ensure live data is fetched instead of mock data

## Testing Movie Listing Functionality
- [ ] Verify movies load on the frontend
- [ ] Test pagination functionality
- [ ] Test search functionality
- [ ] Test movie detail pages
- [ ] Ensure no 401 errors in backend logs
- [x] Improve backend movie fetching logic for better pagination and filtering with live OMDB data

## Optional Improvements
- [ ] Expand mock data if needed for demo purposes
- [ ] Add error handling for API failures
- [ ] Implement caching for better performance
