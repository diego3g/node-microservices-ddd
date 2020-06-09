import AggregateRoot from '@server/shared/src/core/domain/AggregateRoot';
import UniqueEntityID from '@server/shared/src/core/domain/UniqueEntityID';
import Guard from '@server/shared/src/core/logic/Guard';
import Result from '@server/shared/src/core/logic/Result';

interface ITeamProps {
  title: string;
}

export default class Team extends AggregateRoot<ITeamProps> {
  get title(): string {
    return this.props.title;
  }

  private constructor(props: ITeamProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: ITeamProps, id?: UniqueEntityID): Result<Team> {
    const guardResult = Guard.againstNullOrUndefined(props.title, 'title');

    if (!guardResult.succeeded) {
      return Result.fail(guardResult.message);
    }

    const team = new Team(props, id);

    return Result.ok(team);
  }
}
