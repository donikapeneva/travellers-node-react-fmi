import * as React from 'react';

interface AboutsProps {
  info: string;
}

// export const About: React.SFC<AboutsProps> = (props) => {
//   return <h1>About {props.info}</h1>;
// };

export class About extends React.Component<AboutsProps, {}> {
  render() {
    return <h1>About {this.props.info}</h1>;
  }
}
