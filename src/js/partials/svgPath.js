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

export const textToPath = async ({ text, type, offset = false }) => {
  const primaryFont = './assets/fonts/roboto/roboto-medium-webfont.woff';
  const secondaryFont =
    './assets/fonts/montserrat/montserrat-extrabold-webfont.woff';

  console.log(offset);

  const font = await opentype.load(
    type === 'secondary' ? secondaryFont : primaryFont
  );

  const path = font.getPath(formatText(text), offset ? offset : 13, 22, 12);

  path.commands = pathSpacing(path.commands);

  const size = path.getBoundingBox().x2 - path.getBoundingBox().x1;

  return {
    path: path.toPathData(),
    size,
  };
};

const sizeSvg = (size) => {
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

export const buildSvg = async (textPrimary, textSecondary) => {
  const primary = await textToPath({
    text: textPrimary,
    type: 'primary',
  });

  const secondary = await textToPath({
    text: textSecondary,
    type: 'secondary',
    offset: test1.size,
  });

  console.log(primary, secondary);

  const svg = document.querySelector('.shadowSVG');
  const svgRect = document.querySelectorAll('.shadowSVG__rect');
  const svgText = document.querySelectorAll('.text');
  const color = document.querySelectorAll('.color');
  const primaryPathSize = primary.size;
  const secondaryPathSize = secondary.size;

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
