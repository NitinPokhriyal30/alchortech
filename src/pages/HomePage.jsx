import * as React from 'react'

import Top5UserWidget from '../components/HomeRightSidebar/Top5UserWidget'
import RecentCampaignWidget from '../components/HomeRightSidebar/RecentCampaignWidget'
import SurveyOngoingWidget from '../components/HomeRightSidebar/SurveyOngoingWidget'
import RecommendationWidget from '../components/HomeRightSidebar/RecommendationWidget'
import CelebrationWidget from '../components/HomeRightSidebar/CelebrationWidget'
import NewPost from '../components/NewPost'
import { RedeemPointsWidget } from '../components/HomeRightSidebar/RedeemPointsWidget'

import PostCard from '../components/PostCard'
import SortBy from '../components/SortBy'
import ImageSlider from '../components/ImageSlider'
import { useSelector } from 'react-redux'
import { AchievementBanner } from '../components/AchievementBanner'
import GifPicker from '@/components/GifPickerPopover'
import { useQuery } from 'react-query'
import { api } from '@/api'

const getChildTransactionsFor = (parentId, allTransactions) => {
  return allTransactions.filter((post) => post.parent_id == parentId)
}

const withIsChild = (allTransactions) => {
  return allTransactions.map((post) => {
    const hasParent = allTransactions.some((parentPost) => post.parent_id == parentPost.id)
    // if a transaction has a parent transaction then its a child transaction
    post.isChild = hasParent

    return post
  })
}

export default function HomePage() {
  const postList = useQuery('transactions', () => api.transactions.all())

  let allPosts = postList.isLoading ? [] : postList.data
  allPosts = withIsChild(allPosts)
  const parentPosts = allPosts.filter(
    (post) => !post.isChild || getChildTransactionsFor(post.id, allPosts).length > 0
  )

  return (
    <>
      <div className="lg:pl-0 xxl:pt-3 xs:pt-0 pl-3 pr-3 lg:py-3">
        <div>
          <ImageSlider />
        </div>
        <div className="mt-3 relative z-20">
          <NewPost />
        </div>
        <div className="mt-1">
          <SortBy />
        </div>

        <div className="mt-1 relative" id="post-list">
          {postList.isLoading ? (
            <div className="h-64 bg-gray-300  rounded-md" />
          ) : (
            parentPosts.slice(0, 2).map((post, i) => (
              <>
                <PostCard
                  i={i}
                  key={post.id}
                  post={post}
                  childrenTransactions={getChildTransactionsFor(post.id, allPosts)}
                />
              </>
            ))
          )}
        </div>
        <div className="mt-1">
          <AchievementBanner />
        </div>
        <div className="mt-1 relative">
          {postList.isLoading ? (
            <div className="h-64 bg-gray-300  rounded-md" />
          ) : (
            parentPosts
              .slice(2)
              .map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  childrenTransactions={getChildTransactionsFor(post.id, allPosts)}
                />
              ))
          )}
        </div>
      </div>

      <div className="pt-3 pb-5 lg:pr-6 md:pr-3 md:pl-1 pr-3 pl-3 flex flex-col gap-3 overflow-y-auto xl:w-[325px] lg:w-[235px] md:w-[260px] w-full">
        <RedeemPointsWidget />
        <RecommendationWidget />
        <CelebrationWidget />
        <Top5UserWidget />
        <SurveyOngoingWidget />
        <RecentCampaignWidget />
      </div>
    </>
  )
}
