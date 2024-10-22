import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

import staticImage from '../../../../public/static-image.jpg'
import { CallToActionBlock } from '../../_blocks/CallToAction'
import { MediaBlock } from '../../_blocks/MediaBlock'
import { Button } from '../../_components/Button'
import { Gutter } from '../../_components/Gutter'
import { Message } from '../../_components/Message'
import { VerticalPadding } from '../../_components/VerticalPadding'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'

export default async function Typography() {
  return (
    <>
      <Gutter>
        <p>
          <Link href="/styleguide">Styleguide</Link>
          {' / '}
        </p>
        <VerticalPadding bottom="large" top="none">
          <h1>Typography</h1>
          <h1>H1: Lorem ipsum dolor sit amet officia deserunt.</h1>
          <h2>H2: Lorem ipsum dolor sit amet in culpa qui officia deserunt consectetur.</h2>
          <h3>
            H3: Lorem ipsum dolor sit amet in culpa qui officia deserunt consectetur adipiscing
            elit.
          </h3>
          <h4>
            H4: Lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </h4>
          <h5>
            H5: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </h5>
          <h6>
            H6: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </h6>
          <p>
            P: Lorem ipsum dolor sit amet, consectetur adipiscing elit consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. dolore magna aliqua.
            Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem
            ipsum doalor sit amet in culpa qui officia deserunt consectetur adipiscing elit.
          </p>
        </VerticalPadding>
      </Gutter>

      <Gutter>
        <h1>Buttons</h1>
        <VerticalPadding bottom="large" top="none">
          <Button label="Default Button" appearance="default" />
          <br /> <br />
          <Button label="Primary Button" appearance="primary" />
          <br /> <br />
          <Button label="Secondary Button" appearance="secondary" />
        </VerticalPadding>
      </Gutter>

      <Gutter>
        <h1>Message Component</h1>
        <VerticalPadding bottom="medium" top="none">
          <Message message="This is a message" />
          <br />
          <Message error="This is an error" />
          <br />
          <Message success="This is a success" />
          <br />
          <Message warning="This is a warning" />
        </VerticalPadding>
      </Gutter>

      <Gutter>
        <h1>Media Block</h1>

        <VerticalPadding bottom="large" top="none">
          <MediaBlock
            position="default"
            blockType="mediaBlock"
            media=""
            staticImage={staticImage}
          />
          <br />
          <br />
          <MediaBlock
            position="fullscreen"
            blockType="mediaBlock"
            media=""
            staticImage={staticImage}
          />
        </VerticalPadding>
      </Gutter>

      <Gutter>
        <h1>Call To Action Block</h1>
        <VerticalPadding bottom="large" top="none">
          <CallToActionBlock
            blockType="cta"
            richText={[
              {
                type: 'h4',
                children: [
                  {
                    text: 'Lorem ipsum dolor sit amet',
                  },
                ],
              },
              {
                children: [
                  {
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  },
                ],
              },
            ]}
            links={[
              {
                link: {
                  type: 'custom',
                  label: 'Lorem ipsum dolor sit amet',
                  url: '#',
                  reference: null,
                  appearance: 'primary',
                },
              },
            ]}
          />
          <br />
          <br />
          <CallToActionBlock
            blockType="cta"
            invertBackground
            richText={[
              {
                type: 'h4',
                children: [
                  {
                    text: 'Lorem ipsum dolor sit amet',
                  },
                ],
              },
              {
                children: [
                  {
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  },
                ],
              },
            ]}
            links={[
              {
                link: {
                  type: 'custom',
                  label: 'Lorem ipsum dolor sit amet',
                  url: '#',
                  reference: null,
                  appearance: 'primary',
                },
              },
            ]}
          />
        </VerticalPadding>
      </Gutter>
    </>
  )
}

export const metadata: Metadata = {
  title: 'Styleguide',
  description: 'Styleguide',
  openGraph: mergeOpenGraph({
    title: 'Styleguide',
    url: '/styleguide',
  }),
}
