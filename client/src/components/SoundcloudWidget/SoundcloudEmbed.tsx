import React, { useEffect, useRef, useState } from 'react';
import createWidget from './createWidget';

declare global {
  interface Window {
    SC: any;
  }
}

export default function SoundcloudEmbed() {
  const widgetIframe = useRef<any>(null);
  const [internalWidget, setInternalWidget] = useState(null);
  // const $embedPlayer = window.SC.Widget(widgetIframe);
  useEffect(() => {
    // const interval = setInterval(() => {
    //   console.log(window.SC);
    //   if (window.SC && window.SC.Widget) {
    //     clearInterval(interval);
    //     initializePlayer();
    //   }
    // }, 1000);
    if (internalWidget) return;
    createWidget('sc-widget2', (widget: any) => {
      initializePlayer(widget);
    });

    // playerReff.current.SC.bind('PLAY', () => console.log('Playing'));
  }, []);

  const initializePlayer = (widget: any) => {
    console.log('Init Called');
    widget.bind(
      window.SC.Widget.Events.PLAY,
      (data: any) => console.log(data)
      // console.log('Playing auido')
    );

    // $embedPlayer.bind(window.SC.Widget.Events.PLAY, () => {
    //   $embedPlayer.getDuration((duration: any) => console.log(duration));
    // });
    // setInternalWidget(widget);
  };

  return (
    <iframe
      ref={widgetIframe}
      width="100%"
      height="166"
      scrolling="no"
      id="sc-widget2"
      src="https://w.soundcloud.com/player/?url=https://soundcloud.com/mustardofficial/ballin-feat-roddy-ricch"
    ></iframe>
  );
}
