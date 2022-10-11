import { memo, ReactNode } from "react";
import cx from 'classnames';
import { ParsedQuestion } from "../../types/ParsedQuestion";

import "./question.scss";
import UserImage from "../UserImage/UserImage";

type QuestionProps = {
  question: ParsedQuestion,
  children: ReactNode
}

function Question({question, children, ...props}: QuestionProps) {
  const {author, content, isHighlighted, isAnswered} = question;

  return (
    <div className={cx(
        "question",
        {
          answered: isAnswered,
          highlighted: isHighlighted && !isAnswered
        }
      )}
      {...props}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <UserImage
            imageSrc={author.avatar}
            userName={author.name}
          />
          <span>{author.name}</span>
        </div>
        <div className="question-actions">
          {children}
        </div>
      </footer>
    </div>
  )
}

export default memo(Question);
