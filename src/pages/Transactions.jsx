import * as HoverCard from '@radix-ui/react-hover-card'
import CelebrationWidget from '../components/HomeRightSidebar/CelebrationWidget'
import RecentCampaignWidget from '../components/HomeRightSidebar/RecentCampaignWidget'
import RecommendationWidget from '../components/HomeRightSidebar/RecommendationWidget'
import { RedeemPointsWidget } from '../components/HomeRightSidebar/RedeemPointsWidget'
import SurveyOngoingWidget from '../components/HomeRightSidebar/SurveyOngoingWidget'
import Top5UserWidget from '../components/HomeRightSidebar/Top5UserWidget'

import { api } from '@/api'
import {
  getChildTransactionsFor,
  getDaysLeftForNextMonth,
  getNextMonthName,
  withIsChild,
} from '@/utils'
import { useQuery } from 'react-query'
import PostCard from '../components/PostCard'

import { useParams } from 'react-router-dom'
import HelpIcon from '@/assets/svg/home-sidebar/HelpIcon'

export default function Transactions({ ...props }) {
  const { id } = useParams()
  const sortBy = 'all'
  const postList = useQuery(
    ['transaction', sortBy],
    () => api.transactions.all(new URLSearchParams({ key_param: sortBy, pagination: 0 })),
    {
      refetchOnWindowFocus: false,
    }
  )
  const me = useQuery('me')

  let allPosts = postList.data?.results || []
  allPosts = withIsChild(allPosts)
  const post = allPosts
    .filter((post) => !post.isChild || getChildTransactionsFor(post.id, allPosts).length > 0)
    .find((post) => post.id === id)
  console.log({ allPosts })

  return (
    <>
      <div className="pl-3 pr-3 xs:pt-0 lg:py-3 lg:pl-0 xxl:pt-3">
        <HoverCard.Root>
          <p className="flex cursor-pointer items-center justify-center leading-4 bg-white rounded-md p-3 text-18px">
            You Have{' '}
            <span className="font-[900]">&nbsp;{me.data.allowance_boost} Points&nbsp;</span>
            to give
            <HoverCard.Trigger className="ml-2 inline-flex h-4 w-4 items-center justify-center text-white">
              <HelpIcon fill='rgba(0, 0, 200, 0.3)' />
            </HoverCard.Trigger>
          </p>

          <HoverCard.Portal>
            <HoverCard.Content className="z-20 w-screen max-w-[180px] rounded bg-white p-2 text-[12px] leading-[14px] text-[#747474] shadow">
              <HoverCard.Arrow className="fill-white" />
              You monthly allowance will refresh on 1st {getNextMonthName()}. You have{' '}
              {getDaysLeftForNextMonth() + ' '}
              days to spend {me.data.allowance_boost} points.
            </HoverCard.Content>
          </HoverCard.Portal>
        </HoverCard.Root>

        {post == null ? (
          <div className='mt-4 h-64 bg-white animate-pulse rounded-md' />
        ) : (
          <div className="mt-4">
            <PostCard
              post={post}
              childrenTransactions={getChildTransactionsFor(post.id, allPosts)}
              sortBy={sortBy}
            />
          </div>
        )}
      </div>
      {/* right sidebar */}
      <div
        style={{
          position: 'sticky',
          alignSelf: 'flex-end',
          bottom: 0,
        }}
        className="flex w-full flex-col gap-3 overflow-y-auto pb-5 pl-3 pr-3 pt-3 md:w-[260px] md:pl-[0px] lg:w-[235px] lg:pr-0 xl:w-[319px]"
      >
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
