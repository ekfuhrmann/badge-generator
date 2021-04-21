import opentype from 'opentype.js';

const formatText = (text) => {
  return text.toUpperCase().split('').join(' ');
};

const pathSpacing = (data) => {
  const letterSpacing = -0.35;
  let mCount = -1;
  let mPos;

  return data.map(({ x, y, x1, y1, x2, y2, type }, index) => {
    switch (type) {
      case 'Z':
        return { type };
      case 'M':
        if (y == 22 || mPos + 3 < x) {
          mPos = x;
          mCount++;
        }
        return {
          type,
          x: (x || 0) + mCount * letterSpacing,
          ...(y === undefined ? {} : { y }),
        };
      case 'L':
        return {
          type,
          x: (x || 0) + mCount * letterSpacing,
          y,
        };
      case 'Q':
        return {
          type,
          x1: (x1 || 0) + mCount * letterSpacing,
          y1,
          x: (x || 0) + mCount * letterSpacing,
          y,
        };
      case 'C':
        return {
          type,
          x1: (x1 || 0) + mCount * letterSpacing,
          y1,
          x2: (x2 || 0) + mCount * letterSpacing,
          y2,
          x: (x || 0) + mCount * letterSpacing,
          y,
        };
      default:
        throw new Error('invalid glyph path type: ' + type);
    }
  });
};

export const pathGenerator = async (
  string,
  fontType = 'primary',
  offset = 13
) => {
  const primaryFont = './assets/fonts/roboto/roboto-medium-webfont.woff';
  const secondaryFont =
    './assets/fonts/montserrat/montserrat-extrabold-webfont.woff';

  const font = await opentype.load(
    fontType === 'primary' ? primaryFont : secondaryFont
  );

  const path = font.getPath(formatText(string), offset, 22, 12);

  path.commands = pathSpacing(path.commands);
  // console.log(path.toPathData());

  const doot = path.toPathData();

  return { doot, size: path.getBoundingBox().x2 - path.getBoundingBox().x1 };
};

export const badge = (size = false) => {
  const svg = document.querySelector('.shadowSVG');
  const svgRect = document.querySelectorAll('.shadowSVG__rect');
  const svgText = document.querySelectorAll('.text');
  const color = document.querySelectorAll('.color');
  const primaryPathSize = size || svgText[0].getBBox().width;
  const secondaryPathSize = svgText[1].getBBox().width;

  console.log('new size', primaryPathSize);
  console.log('old size', svgText[0].getBBox().width);

  console.log(primaryPathSize, secondaryPathSize);

  svg.setAttributeNS(
    null,
    'viewBox',
    `0 0 ${primaryPathSize + secondaryPathSize + 52} 35`
  );

  svg.setAttributeNS(null, 'width', primaryPathSize + secondaryPathSize + 52);

  svgRect[0].setAttributeNS(
    null,
    'width',
    primaryPathSize ? primaryPathSize + 26 + (secondaryPathSize ? 2 : 0) : 0
  );

  svgRect[0].setAttributeNS(null, 'fill', color[0].value);

  svgRect[1].setAttributeNS(null, 'fill', color[1].value);

  svgRect[1].setAttributeNS(
    null,
    'width',
    secondaryPathSize ? secondaryPathSize + 26 : 0
  );
  svgRect[1].setAttributeNS(
    null,
    'x',
    primaryPathSize ? primaryPathSize + 26 : 0
  );
  svgText[1].setAttributeNS(null, 'x', primaryPathSize + 39);
};

const svg = (strings) => {
  // Inputs are filled, svg updates the way it looks
};

export const fontPaths = async ({ primary = '', secondary = '' }) => {
  const primaryFont = './assets/fonts/roboto/roboto-medium-webfont.woff';
  const secondaryFont =
    './assets/fonts/montserrat/montserrat-extrabold-webfont.woff';

  let primaryPath = {};
  let secondaryPath = {};
  let primaryPathSize = 0;
  let secondaryPathSize = 0;
  // console.log(primary, secondary);

  async function calc(string, type) {
    const primary = './assets/fonts/roboto/roboto-medium-webfont.woff';
    const secondary =
      './assets/fonts/montserrat/montserrat-extrabold-webfont.woff';

    const font = await opentype.load(type);
    const path = font.getPath(formatText(string), 13, 22, 12);
  }

  if (primary !== '') {
    const font = await opentype.load(primaryFont);
    primaryPath = font.getPath(formatText(primary), 13, 22, 12);

    primaryPathSize =
      primaryPath.getBoundingBox().x2 - primaryPath.getBoundingBox().x1;
  }

  console.log(primaryPath);

  if (secondary !== '') {
    const font = await opentype.load(secondaryFont);

    secondaryPath = font.getPath(
      formatText(secondary),
      primaryPathSize,
      22,
      12
    );
  }

  // const path = font.getPath(formatText(string), offset, 22, 12);

  path.commands = pathSpacing(path.commands);
  // console.log(path.toPathData());

  const doot = path.toPathData();

  // return {
  //   doot,
  //   size: path.getBoundingBox().x2 - path.getBoundingBox().x1,
  // };
};

// TODO: So I want to unify the function for building the SVG. I think the key here will be to have the generate path function return to the generate badge function specifc properties such as path size so that the SVG and rects are able to properly calculate their position relative to one another...
