import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import analyticsService from '../lib/analyticsService';

const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // 记录页面访问
    const trackPageView = async () => {
      await analyticsService.trackPageView(location.pathname, {
        title: document.title,
        referrer: document.referrer,
        screenSize: `${window.screen.width}x${window.screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      });
    };

    // 延迟一点时间确保页面完全加载
    const timer = setTimeout(trackPageView, 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // 记录用户交互事件
  useEffect(() => {
    const trackUserInteractions = (event) => {
      const target = event.target;
      const action = event.type;
      
      // 记录点击事件
      if (action === 'click') {
        const tagName = target.tagName.toLowerCase();
        const className = target.className;
        const id = target.id;
        const text = target.textContent?.slice(0, 50);
        
        analyticsService.trackUserAction('click', {
          element: tagName,
          className: className,
          id: id,
          text: text,
          href: target.href || null
        });
      }
      
      // 记录表单提交
      if (action === 'submit' && target.tagName === 'FORM') {
        analyticsService.trackUserAction('form_submit', {
          formId: target.id,
          formAction: target.action
        });
      }
    };

    // 记录滚动事件
    const trackScroll = () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent % 25 === 0) { // 每25%记录一次
        analyticsService.trackUserAction('scroll', {
          scrollPercent: scrollPercent
        });
      }
    };

    // 记录页面停留时间
    let startTime = Date.now();
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent >= 30) { // 每30秒记录一次
        analyticsService.trackUserAction('time_on_page', {
          seconds: timeSpent
        });
        startTime = Date.now();
      }
    };

    const timeInterval = setInterval(trackTimeOnPage, 30000);

    document.addEventListener('click', trackUserInteractions);
    document.addEventListener('submit', trackUserInteractions);
    window.addEventListener('scroll', trackScroll);

    return () => {
      document.removeEventListener('click', trackUserInteractions);
      document.removeEventListener('submit', trackUserInteractions);
      window.removeEventListener('scroll', trackScroll);
      clearInterval(timeInterval);
    };
  }, [location.pathname]);

  return null; // 这个组件不渲染任何内容
};

export default PageTracker;
