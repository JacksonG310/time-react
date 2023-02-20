import { RootState } from '@/types';
import React from 'react';
import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';
import PlanHeader from '@/components/PlanHeader';
import "./index.less";
import AddForm from '@/components/addForm';
import AddBtn from '@/components/addBtn';
import { planAction } from '.';
import { matterActions } from '../Matter';
import { Dayjs } from 'dayjs';
interface StateProps {
    addFormVisible: {
        visitable: boolean;
        isEdit: boolean;
    };
    currentDate: Dayjs;
}

interface Props extends StateProps { };

const PlanBase: React.FC<Props> = (props) => {
    const { addFormVisible, currentDate } = props;
    const handleClick = () => matterActions.changleAddFormVisible(true);

    return (
        <div className='plan-page'>
            <div className='plan-header'>
                <PlanHeader date={currentDate} />
            </div>
            <div className='plan-body'>
                <Outlet />
            </div>
            <AddForm addFromVisiable={addFormVisible} />
            <AddBtn onClick={handleClick} />
        </div>
    )
};

function mapStateToProps(state: RootState) {
    return {
        addFormVisible: state.root.matterModule.addFormVisible,
        currentDate: state.root.planModule.currentDate
    }
}
const Plan = connect(mapStateToProps)(PlanBase);

export default Plan;