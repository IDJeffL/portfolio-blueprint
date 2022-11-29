import Image from 'next/image'

import styles from './Acf.module.scss';

/**
 * AcfExample.
 */
export default function Acf({ postContent }) {
  if ( ! postContent) {
     return null;
  }

  return (
    <>
      { postContent?.acfExample?.exampleTextField && 
        <div className={styles.border}>
          <h4>
            {postContent?.acfExample?.exampleTextField}
          </h4>
          <p>
            { postContent?.acfExample?.exampleImage?.mediaItemUrl && 
              <Image
                src={postContent?.acfExample?.exampleImage?.mediaItemUrl}
                alt=""
                height="400"
                width="800"
              />
            }
            <br />
            {postContent?.acfExample?.exampleTextareaField}
          </p>
        </div>
      }
    </>
  );
}
