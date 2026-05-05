import { Hero } from '@/commons/components'
import { useContext, useEffect } from 'react'
import HeaderContext from '@/commons/components/Header/HeaderContext';
import loadPlugin from '@/pluginLoader'

const assetsPlugin = loadPlugin('assets')

const DUMMY_BANNER =
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
let bannerSrc = assetsPlugin?.banner?.()
bannerSrc = bannerSrc !== undefined ? bannerSrc : DUMMY_BANNER;

const LandingPage = () => {
  const { setTitle } = useContext(HeaderContext);
  useEffect(() => setTitle("Home"), []);

  return (
    <div className="landing-page">
      <Hero banner={bannerSrc} />
    </div>
  )
}

export default LandingPage
