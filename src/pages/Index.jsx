import React from 'react';
import HackerNewsList from '../components/HackerNewsList';
import SearchBar from '../components/SearchBar';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-orange-600">Hacker News Top Stories</h1>
      <SearchBar />
      <HackerNewsList />
    </div>
  );
};

export default Index;